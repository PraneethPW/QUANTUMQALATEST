import CountUp from "react-countup"
import { useInView } from "react-intersection-observer"

interface Props {
  label: string
  value: number
  suffix?: string
}

const AnimatedMetric = ({ label, value, suffix }: Props) => {

  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0.6
  })

  return (

    <div
      ref={ref}
      className="bg-white/5 backdrop-blur-xl p-6 rounded-xl border border-white/10 hover:border-cyan-400/40 transition"
    >

      <p className="text-gray-400 text-sm">
        {label}
      </p>

      <h4 className="text-4xl font-bold text-cyan-400 mt-2">

        {inView && (
          <CountUp
            start={0}
            end={value}
            duration={2}
            separator=","
            suffix={suffix}
          />
        )}

      </h4>

    </div>

  )
}

export default AnimatedMetric