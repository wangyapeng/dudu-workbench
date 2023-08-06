<template>
  <div class="clock_container">
    <div class="clock" :style="clockStyle">
      <div class="clock-circle"></div>
      <div class="clock-hour" :style="{ transform: data.hourRotate }"></div>
      <div class="clock-minute" :style="{ transform: data.minuteRotate }"></div>
      <div class="clock-second" :style="{ transform: data.secondRotate }"></div>
      <b class="hour" v-for="h in data.timeList" :key="h">
        <span>
          <i :style="{ transform: data.transform }">{{ h }}</i>
        </span>
      </b>
    </div>
  </div>
</template>
<script setup>
import {
  ref,
  onMounted,
  onBeforeMount,
  reactive,
  computed,
  onUnmounted,
} from "vue";
const value = ref(new Date());
const data = reactive({
  timeList: [12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
  transform: "scale(1)",
  hourRotate: "rotatez(0deg)",
  minuteRotate: "rotatez(0deg)",
  secondRotate: "rotatez(0deg)",
});
const props = defineProps(["time", "color", "border", "bg", "size"]);
const state = reactive({
  size: props.size,
  color: props.color,
  border: props.border,
  bg: props.bg,
  size: props.size,
});
const clockStyle = computed(() => {
  return {
    height: state.size,
    width: state.size,
    color: state.color,
    border: state.border,
    background: state.bg,
  };
});

var time;
var _timer;

function show() {
  showTime();
  if (_timer) clearInterval(_timer);
  if (!time) {
    _timer = setInterval(() => {
      showTime();
    }, 1000);
  }
}

function showTime() {
  let times;
  if (time) {
    times = time.split(":");
  } else {
    const now = new Date();
    times = [now.getHours(), now.getMinutes(), now.getSeconds()];
  }

  let hour = +times[0];
  hour = hour > 11 ? hour - 12 : hour;
  let minute = +times[1];
  let second = +times[2] || 0;
  let hourAngle = hour * 30 + ((minute * 6) / 360) * 30;
  let minuteAngle = minute * 6;
  let secondAngle = second * 6;
  data.hourRotate = `rotatez(${hourAngle}deg)`;
  data.minuteRotate = `rotatez(${minuteAngle}deg)`;
  data.secondRotate = `rotatez(${secondAngle}deg)`;
}

onMounted(() => {
  let scale = 200 / 120;
  scale = scale > 3 ? 3 : scale;
  data.transform = `scale(${scale})`;
  show();
});

onUnmounted(() => {
  if (_timer) clearInterval(_timer);
});
</script>
<style lang="less">
@angle: 30deg;
@marginKey: 2, 3, 4, 5, 6, 7, 8;
.clock_container {
  flex: 1;
}
ul,
ol {
  list-style-type: none;
}

.clock {
  position: relative;
  display: inline-block;
  vertical-align: middle;
  width: 150px;
  height: 150px;
  border: 2px solid;
  border-radius: 100%;
  text-align: center;
  font-size: 14px;

  .hour {
    position: absolute;
    top: 0px;
    left: 50%;
    display: block;
    width: 20px;
    height: 50%;
    margin-left: -10px;
    padding-top: 4%;
    font-weight: 400;
    transform-origin: bottom;
    user-select: none;
    box-sizing: border-box;
    > span {
      display: block;

      > i {
        display: block;
        font-style: normal;
      }
    }
  }

  .hour:nth-of-type(2) {
    transform: rotatez(calc(@angle * (2 - 1)));
    > span {
      transform: rotatez(calc(-@angle * (2 - 1)));
    }
  }

  .hour:nth-of-type(3) {
    transform: rotatez(calc(@angle * (3 - 1)));
    > span {
      transform: rotatez(calc(-@angle * (3 - 1)));
    }
  }

  .hour:nth-of-type(4) {
    transform: rotatez(calc(@angle * (4 - 1)));
    > span {
      transform: rotatez(calc(-@angle * (4 - 1)));
    }
  }

  .hour:nth-of-type(5) {
    transform: rotatez(calc(@angle * (5 - 1)));
    > span {
      transform: rotatez(calc(-@angle * (5 - 1)));
    }
  }
  .hour:nth-of-type(6) {
    transform: rotatez(calc(@angle * (6 - 1)));
    > span {
      transform: rotatez(calc(-@angle * (6 - 1)));
    }
  }
  .hour:nth-of-type(7) {
    transform: rotatez(calc(@angle * (7 - 1)));
    > span {
      transform: rotatez(calc(-@angle * (7 - 1)));
    }
  }
  .hour:nth-of-type(8) {
    transform: rotatez(calc(@angle * (8 - 1)));
    > span {
      transform: rotatez(calc(-@angle * (8 - 1)));
    }
  }
  .hour:nth-of-type(9) {
    transform: rotatez(calc(@angle * (9 - 1)));
    > span {
      transform: rotatez(calc(-@angle * (9 - 1)));
    }
  }
  .hour:nth-of-type(10) {
    transform: rotatez(calc(@angle * (10 - 1)));
    > span {
      transform: rotatez(calc(-@angle * (10 - 1)));
    }
  }
  .hour:nth-of-type(11) {
    transform: rotatez(calc(@angle * (11 - 1)));
    > span {
      transform: rotatez(calc(-@angle * (11 - 1)));
    }
  }
  .hour:nth-of-type(12) {
    transform: rotatez(calc(@angle * (12 - 1)));
    > span {
      transform: rotatez(calc(-@angle * (12 - 1)));
    }
  }

  .clock-circle {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 16px;
    height: 16px;
    transform: translate(-50%, -50%);
    border: 2px solid #666666;
    border-radius: 100%;
    background-color: #ffffff;
    z-index: 1;
    box-sizing: border-box;

    &:before {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      display: block;
      content: "";
      width: 4px;
      height: 4px;
      border-radius: 100%;
      background-color: #666666;
    }
  }

  .clock-hour,
  .clock-minute,
  .clock-second {
    position: absolute;
    top: 15%;
    left: 50%;
    display: block;
    width: 2px;
    height: 35%;
    margin-left: -1px;
    border-radius: 5px;
    transform-origin: bottom;
    background-color: #666666;
  }

  .clock-hour {
    top: 30%;
    width: 4px;
    height: 20%;
    margin-left: -2px;
  }

  .clock-second {
    width: 1px;
  }
}

.clock.is-small {
  width: 80px;
  height: 80px;
  border-width: 1px;
  font-size: 12px;

  .clock-circle {
    width: 10px;
    height: 10px;
    border-width: 1px;
    &:before {
      width: 2px;
      height: 2px;
    }
  }
}
</style>
