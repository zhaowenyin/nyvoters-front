<template>
    <div :class="className">
        <canvas :height="size" :width="size" ref="qrcode-vue" ></canvas>
    </div>
</template>
<script>
import QRCode from 'qr.js/lib/QRCode'
import ErrorCorrectLevel from 'qr.js/lib/ErrorCorrectLevel'
function getBackingStorePixelRatio(ctx) {
  return (
    ctx.webkitBackingStorePixelRatio ||
    ctx.mozBackingStorePixelRatio ||
    ctx.msBackingStorePixelRatio ||
    ctx.oBackingStorePixelRatio ||
    ctx.backingStorePixelRatio ||
    1
  )
}
export default {
  props: {
    value: {
      type: String,
      required: true,
      default: ''
    },
    className: {
      type: String,
      default: ''
    },
    size: {
      type: [Number, String],
      default: 100,
      validator: s => isNaN(Number(s)) !== true
    },
    level: {
      type: String,
      default: 'L',
      validator: l => ['L', 'M', 'Q', 'H'].indexOf(l) > -1
    },
    background: {
      type: String,
      default: '#fff'
    },
    foreground: {
      type: String,
      default: '#000'
    }
  },
  watch:{
    value() {
      //修复url修改时数据更新
      this.render()
    }
  },
  methods: {
    render() {
      const {value, size, level, background, foreground} = this
      const _size = size >>> 0 // size to number
      // We'll use type===-1 to force QRCode to automatically pick the best type
      const qrCode = new QRCode(-1, ErrorCorrectLevel[level])
      qrCode.addData(value)
      qrCode.make()

      const canvas = this.$refs['qrcode-vue']

      const ctx = canvas.getContext('2d')
      const cells = qrCode.modules
      const tileW = _size / cells.length
      const tileH = _size / cells.length
      const scale = (window.devicePixelRatio || 1) / getBackingStorePixelRatio(ctx)
      canvas.height = canvas.width = _size * scale
      ctx.scale(scale, scale)

      cells.forEach(function (row, rdx) {
        row.forEach(function (cell, cdx) {
          ctx.fillStyle = cell ? foreground : background
          const w = (Math.ceil((cdx + 1) * tileW) - Math.floor(cdx * tileW))
          const h = (Math.ceil((rdx + 1) * tileH) - Math.floor(rdx * tileH))
          ctx.fillRect(Math.round(cdx * tileW), Math.round(rdx * tileH), w, h)
        })
      })
    },
    _fixType(type) {
      type = type.toLowerCase().replace(/jpg/i, 'jpeg');
      const r = type.match(/png|jpeg|bmp|gif/)[0];
      return 'image/' + r;
    },
    saveImage() {
      const type="png"
      const canvas = this.$refs['qrcode-vue']
      const imgData = canvas.toDataURL(type).replace(this._fixType(type),'image/octet-stream')

      const filename = '二维码_' + (new Date()).getTime() + '.' + type
      const save_link = document.createElementNS('http://www.w3.org/1999/xhtml', 'a');
      save_link.href = imgData;
      save_link.download = filename;

      const event = document.createEvent('MouseEvents');
      event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
      save_link.dispatchEvent(event);

    }
  },
  updated() {
    this.render()
  },
  mounted() {
    this.render()
  }
}
</script>
