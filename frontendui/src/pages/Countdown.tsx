import { useState, useEffect, useMemo } from "react";
import { Box, Text } from "@chakra-ui/react";
import Title from "../components/Title";

interface props {
  size: number;
  totalTime: number;
  color?: string;
}

const Countdown = ({ size = 200, totalTime, color = "teal" }: props) => {
  const xy = useMemo(() => size / 2, [size]);
  const w = useMemo(() => size / 10, [size]);
  const r = useMemo(() => (size - w) / 2, [size, w]);
  const circumference = useMemo(() => 2 * Math.PI * r, [r]);
  const [time, setTime] = useState(totalTime);
  const offset = useMemo(
    () => circumference * (time / totalTime),
    [circumference, time, totalTime]
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setTime((prevTime) => {
        if (prevTime === 0) {
          clearInterval(interval);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Title
        title="Countdown Timer"
        description={`A ${totalTime}-second countdown timer with circular progress`}
      />
      <Box display="flex" justifyContent="center" alignItems="center" minH="400px">
        <Box
          position="relative"
          w={size}
          h={size}
          bg="white"
          borderRadius="full"
          boxShadow="xl"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <svg
            width={size}
            height={size}
            style={{ position: "absolute" }}
          >
            <circle
              cx={xy}
              cy={xy}
              r={r}
              fill="transparent"
              stroke="#e2e8f0"
              strokeWidth={w}
            />
            <circle
              cx={xy}
              cy={xy}
              r={r}
              fill="transparent"
              stroke={color}
              strokeWidth={w}
              strokeDasharray={circumference}
              strokeDashoffset={circumference - offset}
              strokeLinecap="round"
              transform={`rotate(-90 ${xy} ${xy})`}
              style={{ transition: "stroke-dashoffset 1s ease-in-out" }}
            />
          </svg>
          <Text
            fontSize={`${size / 4}px`}
            fontWeight="900"
            color={time === 0 ? "red.500" : "gray.800"}
            zIndex={1}
          >
            {time}
          </Text>
        </Box>
      </Box>
      {time === 0 && (
        <Box
          bg="red.100"
          color="red.800"
          p={4}
          borderRadius="lg"
          textAlign="center"
          mt={6}
        >
          ⏰ Time's up!
        </Box>
      )}
    </>
  );
};

export default Countdown;
