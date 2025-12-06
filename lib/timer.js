class Timer {
  constructor(name) {
    this.name = name;
    this.startTime = Date.now();
    this.startHR = process.hrtime.bigint();
  }

  elapsed() {
    const nanoseconds = Number(process.hrtime.bigint() - this.startHR);
    const milliseconds = nanoseconds / 1_000_000;

    if (milliseconds < 1) {
      return `${(milliseconds * 1000).toFixed(2)} μs`;
    } else if (milliseconds < 1000) {
      return `${milliseconds.toFixed(2)} ms`;
    } else {
      return `${(milliseconds / 1000).toFixed(3)} s`;
    }
  }

  getRawTimings() {
    const nanoseconds = Number(process.hrtime.bigint() - this.startHR);
    const milliseconds = nanoseconds / 1_000_000;
    const microseconds = nanoseconds / 1_000;
    const seconds = milliseconds / 1000;

    return {
      nanoseconds,
      microseconds,
      ms: milliseconds,
      seconds,
    };
  }
}

function timedRun(fn, input) {
  const timer = new Timer();
  const result = fn(input);
  const time = timer.elapsed();
  const timings = timer.getRawTimings();

  // Calculate remainders: only show microseconds if < 1000, only show ms if < 1000
  const totalMicroseconds = Math.round(timings.microseconds);
  const totalMilliseconds = Math.round(timings.ms);
  const totalSeconds = Math.round(timings.seconds);

  const remainingMicroseconds = totalMicroseconds % 1000;
  const remainingMilliseconds = totalMilliseconds % 1000;

  const result_obj = {
    Answer: result,
  };

  if (totalSeconds) result_obj.s = totalSeconds;
  if (remainingMilliseconds) result_obj.ms = remainingMilliseconds;
  if (remainingMicroseconds) result_obj.μs = remainingMicroseconds;

  return result_obj;
}

module.exports = Timer;
module.exports.timedRun = timedRun;
