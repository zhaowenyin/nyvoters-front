<template>
   <div class="out">
    <div class="a">
      <div class="a1"></div>
      <div class="a2">
        <div class="a2-1"></div>
        <div class="a2-1 a2-2"></div>
      </div>
      <div class="a1">
        <div class="middle-left"></div>
      </div>
    </div>
      <!-- <Pie style="flex: 1;background: rgba(255,255,255,0.7)" :list="regVotersList"/> -->
      <div style="flex: 1;background: rgba(255,255,255,0.7)">
        <slot name="right" />
      </div>
      <div class="a a11">
      <div class="a1"></div>
      <div class="a2">
        <div class="a2-1"></div>
        <div class="a2-1 a2-2-2"></div>
      </div>
      <div class="a1">
        <div class="middel-right"></div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {

    }
  },
  props: {

  }
}
</script>
<style scoped>
.out {
  display: flex;
  flex: 1;
}
.a {
  display: flex;
  flex-direction: column;
  & .a1 {
    flex: 1;
    width: 6px;
    border-left: 1px solid #fdaf51;
    background: rgba(255,255,255,0.7);
   & .middel-left {
      width: 100%;
      height: 100%;
      background: url("../../assets/img/middel-left.png") center center no-repeat;
      background-size: 100% 100%;
    }
    & .middel-right {
      width: 100%;
      height: 100%;
      background: url("../../assets/img/middle-right.png") center center no-repeat;
      background-size: 100% 100%;
    }

  }
  & .a2 {
    flex: 1.5;
    display: flex;
    flex-direction: column;
    padding: 2px 0;
    & .a2-1 {
      flex: 1;
      width: 6px;
      background: transparent;
      border-right: 1px solid #fdaf51;
      border-top: 1px solid #fdaf51;
      transform:skewY(40deg);
      &.a2-2{
         background: transparent;
        transform:skewY(-40deg);
        border-bottom: 1px solid #fdaf51;
        border-top:none;
      }
    }
  }
  &.a11 {
     & .a1 {
       border-right: 1px solid #fdaf51;
       border-left: none;
     }
     & .a2 {
        & .a2-1 {
          border-right: 0;
          border-top: 1px solid #fdaf51;
          border-left: 1px solid #fdaf51;
          border-bottom: none;
          transform:skewY(-40deg);
        }
        & .a2-2-2{
          border-top: none;
          transform:skewY(40deg);
          border-bottom:1px solid #fdaf51;
       }
     }
  }
}
.out-bottom {
  display: flex;
  padding-left: 4px;
  padding-right: 4px;
  & div {
    flex: 1;
    height: 10px;
    border-left: 1px solid #fdaf51;
    border-bottom: 1px solid #fdaf51;
    background: rgba(255,255,255,0.7);
    transform:skewX(40deg);
    &.out-bottom-2 {
      border-left: none;
          border-right: 1px solid #fdaf51;
      transform:skewX(-40deg);
    }
  }

}

</style>
