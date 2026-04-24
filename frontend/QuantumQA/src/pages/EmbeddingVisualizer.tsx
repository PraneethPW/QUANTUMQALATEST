import { useMemo, useState } from "react"
import { Link } from "react-router-dom"
import {
  CartesianGrid,
  ResponsiveContainer,
  Scatter,
  ScatterChart,
  Tooltip,
  XAxis,
  YAxis
} from "recharts"
import API from "../services/api"

type NodeType = "input_word" | "input_phrase" | "related_word"

type VizNode = {
  id: string
  text: string
  type: NodeType
  raw: { x: number; y: number }
  entangled: { x: number; y: number }
}

type VizEdge = {
  source: string
  target: string
  weight: number
  kind: string
}

type VizResponse = {
  nodes: VizNode[]
  edges: VizEdge[]
  meta: {
    input_words: string[]
    input_phrases: string[]
    related_terms: string[]
    counts: Record<string, number>
  }
}

const COLORS: Record<NodeType, string> = {
  input_word: "#22d3ee",
  input_phrase: "#a78bfa",
  related_word: "#94a3b8"
}

function NodeTooltip({
  active,
  payload
}: {
  active?: boolean
  payload?: Array<{ payload: any }>
}) {
  if (!active || !payload?.length) return null
  const p = payload[0].payload as {
    text: string
    type: NodeType
    x: number
    y: number
  }
  return (
    <div className="rounded-lg border border-white/10 bg-black/70 px-3 py-2 text-xs text-white backdrop-blur">
      <div className="font-semibold">{p.text}</div>
      <div className="text-gray-300">{p.type.replace("_", " ")}</div>
      <div className="text-gray-400">
        x: {p.x.toFixed(2)} · y: {p.y.toFixed(2)}
      </div>
    </div>
  )
}

function buildDataset(nodes: VizNode[], mode: "raw" | "entangled") {
  return nodes.map((n) => ({
    id: n.id,
    text: n.text,
    type: n.type,
    fill: COLORS[n.type],
    x: mode === "raw" ? n.raw.x : n.entangled.x,
    y: mode === "raw" ? n.raw.y : n.entangled.y
  }))
}

const EmbeddingVisualizer = () => {
  const [text, setText] = useState("solar system such as the comet in fact")
  const [includePhrases, setIncludePhrases] = useState(true)
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<VizResponse | null>(null)
  const [error, setError] = useState<string | null>(null)

  const rawData = useMemo(() => (data ? buildDataset(data.nodes, "raw") : []), [data])
  const entData = useMemo(
    () => (data ? buildDataset(data.nodes, "entangled") : []),
    [data]
  )

  const rawGroups = useMemo(() => {
    if (!rawData.length) return []
    return (["input_word", "input_phrase", "related_word"] as NodeType[]).map((t) => ({
      type: t,
      data: rawData.filter((d) => d.type === t),
      color: COLORS[t]
    }))
  }, [rawData])

  const entGroups = useMemo(() => {
    if (!entData.length) return []
    return (["input_word", "input_phrase", "related_word"] as NodeType[]).map((t) => ({
      type: t,
      data: entData.filter((d) => d.type === t),
      color: COLORS[t]
    }))
  }, [entData])

  const run = async () => {
    if (!text.trim()) return
    setLoading(true)
    setError(null)
    try {
      const res = await API.post<VizResponse>("/embedding-visualize", {
        text,
        include_phrases: includePhrases,
        max_related: 16
      })
      setData(res.data)
    } catch (e: any) {
      setError(e?.message || "Failed to visualize embeddings.")
      setData(null)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#020617] text-white">
      <div className="px-12 pt-10 pb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-cyan-300">Embedding Entanglement Map</h1>
          <p className="text-sm text-gray-400 mt-2 max-w-[70ch]">
            Enter text → words + phrases are embedded → related terms are pulled from results → a
            contextual “entanglement” interaction is applied → t-SNE shows the relationship map.
          </p>
        </div>

        <div className="flex items-center gap-3 text-sm">
          <Link
            to="/"
            className="rounded-lg border border-white/10 px-4 py-2 hover:bg-white/5"
          >
            Home
          </Link>
        </div>
      </div>

      <div className="px-12 pb-10">
        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-12 lg:col-span-4 space-y-4">
            <div className="rounded-xl border border-white/10 bg-white/5 p-4">
              <div className="text-xs text-gray-400 mb-2">Input</div>
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                rows={5}
                className="w-full resize-none rounded-lg bg-black/20 p-3 outline-none border border-white/10 focus:border-cyan-400/60"
                placeholder="Type something like: solar system ... "
              />

              <div className="mt-3 flex items-center justify-between">
                <label className="flex items-center gap-2 text-sm text-gray-300 select-none">
                  <input
                    type="checkbox"
                    checked={includePhrases}
                    onChange={(e) => setIncludePhrases(e.target.checked)}
                  />
                  Include phrase embeddings
                </label>

                <button
                  onClick={run}
                  className="rounded-lg bg-cyan-500 px-4 py-2 font-semibold text-black hover:bg-cyan-400 disabled:opacity-60"
                  disabled={loading}
                >
                  {loading ? "Computing..." : "Visualize"}
                </button>
              </div>

              {error && <div className="mt-3 text-sm text-red-300">{error}</div>}
            </div>

            {data && (
              <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                <div className="text-xs text-gray-400 mb-3">Extracted</div>
                <div className="space-y-2 text-sm">
                  <div>
                    <span className="text-cyan-300 font-semibold">Words</span>{" "}
                    <span className="text-gray-400">
                      ({data.meta.input_words.length})
                    </span>
                    <div className="mt-1 text-gray-200 break-words">
                      {data.meta.input_words.join(", ")}
                    </div>
                  </div>
                  {data.meta.input_phrases.length > 0 && (
                    <div>
                      <span className="text-purple-300 font-semibold">Phrases</span>{" "}
                      <span className="text-gray-400">
                        ({data.meta.input_phrases.length})
                      </span>
                      <div className="mt-1 text-gray-200 break-words">
                        {data.meta.input_phrases.join(" · ")}
                      </div>
                    </div>
                  )}
                  <div>
                    <span className="text-gray-200 font-semibold">Related terms</span>{" "}
                    <span className="text-gray-400">
                      ({data.meta.related_terms.length})
                    </span>
                    <div className="mt-1 text-gray-300 break-words">
                      {data.meta.related_terms.join(", ")}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="col-span-12 lg:col-span-8">
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-sm font-semibold text-cyan-200">Word Embedding</div>
                  <div className="text-xs text-gray-400">t-SNE (2D)</div>
                </div>
                <div className="h-[420px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <ScatterChart margin={{ top: 10, right: 10, bottom: 10, left: 10 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.08)" />
                      <XAxis
                        dataKey="x"
                        type="number"
                        tick={{ fill: "rgba(255,255,255,0.45)", fontSize: 11 }}
                        axisLine={{ stroke: "rgba(255,255,255,0.12)" }}
                      />
                      <YAxis
                        dataKey="y"
                        type="number"
                        tick={{ fill: "rgba(255,255,255,0.45)", fontSize: 11 }}
                        axisLine={{ stroke: "rgba(255,255,255,0.12)" }}
                      />
                      <Tooltip content={<NodeTooltip />} />
                      {rawGroups.map((g) => (
                        <Scatter key={g.type} data={g.data} fill={g.color} />
                      ))}
                    </ScatterChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-3 text-xs text-gray-400">
                  Expect semantically related terms (e.g. “solar” and “system”) to sit closer than
                  filler words (e.g. “what”, “is”, “such as”).
                </div>
              </div>

              <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-sm font-semibold text-cyan-200">Entanglement Embedding</div>
                  <div className="text-xs text-gray-400">contextual interaction + t-SNE</div>
                </div>
                <div className="h-[420px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <ScatterChart margin={{ top: 10, right: 10, bottom: 10, left: 10 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.08)" />
                      <XAxis
                        dataKey="x"
                        type="number"
                        tick={{ fill: "rgba(255,255,255,0.45)", fontSize: 11 }}
                        axisLine={{ stroke: "rgba(255,255,255,0.12)" }}
                      />
                      <YAxis
                        dataKey="y"
                        type="number"
                        tick={{ fill: "rgba(255,255,255,0.45)", fontSize: 11 }}
                        axisLine={{ stroke: "rgba(255,255,255,0.12)" }}
                      />
                      <Tooltip content={<NodeTooltip />} />
                      {entGroups.map((g) => (
                        <Scatter key={g.type} data={g.data} fill={g.color} />
                      ))}
                    </ScatterChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-3 text-xs text-gray-400">
                  Related/result words are pulled toward the input context after “entanglement”.
                </div>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-3 text-xs">
              <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1">
                <span className="inline-block h-2 w-2 rounded-full" style={{ background: COLORS.input_word }} />
                <span className="text-gray-300">Input words</span>
              </div>
              <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1">
                <span className="inline-block h-2 w-2 rounded-full" style={{ background: COLORS.input_phrase }} />
                <span className="text-gray-300">Input phrases</span>
              </div>
              <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1">
                <span className="inline-block h-2 w-2 rounded-full" style={{ background: COLORS.related_word }} />
                <span className="text-gray-300">Related/result words</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EmbeddingVisualizer

