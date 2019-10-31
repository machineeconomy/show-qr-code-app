<template>
  <div id="app">
    <h1 class="title">AKITA DOBOT</h1>
    <h2 class="sub-title">IOTA Machine Wallet</h2>
    <header />
    <div v-if="!active">
      <h2 class="sub-title">Next Draw in:</h2>
      <countdown id="time" :time="time" @end="handleCountdownEnd">
        <template slot-scope="props">{{ props.seconds }}</template>
      </countdown>
    </div>
    <div v-else>
      <iota-payment @paymentSuccess="paymentSuccess" ref="payButton">Show QR Code</iota-payment>
    </div>
  </div>
</template>

<script>
import header from "./components/Header";
export default {
  name: "app",
  data() {
    return {
      time: 5 * 1000,
      active: false
    };
  },
  methods: {
    handleCountdownEnd() {
      this.active = true;
      let self = this;
      setTimeout(function() {
        // click on button
        console.log("but", self.$refs.payButton.$el.children[0].click());
      });
      return;
      const elem = this.elem.click();
    },
    paymentSuccess() {
      console.log("paymentSuccess");
      location.reload();
    }
  }
};
</script>

<style>
:root {
  --akita-primary: #00b0f0;
  --akita-secondary: #00fb92;
  --akita-dark: #3b3838;
  --akita-light: #f2f2f2;
  --akita-blue: #00b0f0;
}
body {
  height: 100vh;
  widows: 100%;
  text-align: center;
  justify-content: center;
}
#app {
  font-family: "Oswald", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: var(--akita-light);
  margin: 0 auto;
  margin-top: 60px;
  background: linear-gradient(
    to bottom right,
    var(--akita-primary) 50%,
    var(--akita-secondary) 85%
  );
  border-radius: 10px;
  padding: 20px 20px;
  max-width: 600px;
}
.title {
  font-size: 4em;
  font-weight: bold;
}
.sub-title {
  font-size: 3em;
  font-weight: bold;
}
.seconds {
  font-size: 2em;
}
.logo {
  width: 200px;
}
#time {
  font-size: 10em;
}
</style>
