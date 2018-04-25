<template>
  <div class="image-cropper">
    <input
      type="file"
      name="image"
      accept="image/*"
      style="font-size: 1.2em padding: 10px 0"
      @change="setImage"
    >
    <div>
      <extra-cropper
        ref="cropper"
        :guides="false"
        :view-mode="2"
        :movable="false"
        :crop-box-movable="false"
        :crop-box-resizable="false"
        :auto-crop-area="0.5"
        :min-container-width="200"
        :min-container-height="200"
        :background="true"
        :rotatable="false"
        :zoomable="false"
        drag-mode="crop"
        :src="imgSrc"
        :img-style="imgStyle"
        :ready="onCropReady"
        :cropmove="onCropMove"
        alt="Source Image"/>
    </div>
    <img
      :src="cropImg"
      style="width: 200px height: 200px border: 1px solid gray"
      alt="Cropped Image"
    >
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      imgSrc: '',
      cropImg: '',
      imgStyle: {
        width: '400px',
        height: '300px'
      }
    }
  },
  methods: {
    setImage (event) {
      const file = event.target.files[0]

      if (!file.type.includes('image/')) {
        alert('Please select an image file')
        return
      }

      const reader = new FileReader()

      reader.onload = (event) => {
        this.imgSrc = event.target.result
        this.$refs.cropper.replace(event.target.result)
      }

      reader.readAsDataURL(file)
    },
    onCropReady () {

    },
    onCropMove () {
      this.cropImg = this.$refs.cropper.getCroppedCanvas().toDataURL()
    },
    rotate () {
      this.$refs.cropper.rotate(90)
    }
  }
}
</script>

<style lang="scss" scoped>
  .image-cropper {
    width: 200px;
    height: 200px;
  }
</style>
