App({
  onLaunch: function () {},

  watch: function (ctx, obj) {
    Object.keys(obj).forEach(key => {
      this.observer(ctx.data, key, ctx.data[key], function (value) {
        obj[key].call(ctx, value)
      })
    })
  },
  observer: function (data, key, val, fn) {
    Object.defineProperty(data, key, {
      configurable: true,
      enumerable: true,
      get: function () {
        return val
      },
      set: function () {
        if (newVal === val) return
        fn && fn(newVal)
        val = newVal
      }
    })
  },

  globalData: {
    userInfo: {}
  }
})