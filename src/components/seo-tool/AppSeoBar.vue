<template>
  <div class="custom-bar-container">
    <!--<div :class="-->
    <!--['progress-custom-bar',-->
    <!--(seoIndicatorLength  > minSuccessCharLength) && (seoIndicatorLength <= maxSuccessCharLength) ? 'success': 'error']"-->
    <!--:style="(seoIndicatorLength < maxAllowedChar) ? { width: (seoIndicatorLength / divideRation) + '%' } : { width: 100 + '%'}">-->
    <!--</div>-->
    <div :class="
      ['progress-custom-bar',
      cssClass,
      (calcIndicator())]"
         :style="(seoIndicatorLength < maxAllowedChar) ? { width: (seoIndicatorLength / divideRation) + '%' } : { width: 100 + '%'}">
    </div>
  </div>
</template>

<script>
    export default {
        name: "app-seo-bar",
        props: {
            seoIndicatorLength: Number,
            seoField: String,
            maxAllowedChar: Number,
            divideRation: Number
        },
        data() {
            return {
                cssClass: {
                    type: String,
                    default: ''
                }
            }
        },
        methods: {
            calcIndicator() {
                if(this.seoField === 'metaTitle') {
                    if(this.seoIndicatorLength  > 0 && this.seoIndicatorLength <= 20) {
                        this.cssClass = 'error';
                    } else if(this.seoIndicatorLength  > 20 && this.seoIndicatorLength <= 40) {
                        this.cssClass = 'warning';
                    } else if(this.seoIndicatorLength  > 40 && this.seoIndicatorLength <= 60) {
                        this.cssClass = 'success';
                    } else if(this.seoIndicatorLength  > 60 && this.seoIndicatorLength <= 70) {
                        this.cssClass = 'warning';
                    } else if(this.seoIndicatorLength  > 70 && this.seoIndicatorLength <= this.maxAllowedChar) {
                        this.cssClass = 'error';
                    }
                } else {
                    if(this.seoIndicatorLength  > 0 && this.seoIndicatorLength <= 20 * this.divideRation) {
                        this.cssClass = 'error';
                    } else if(this.seoIndicatorLength  > 20 * this.divideRation && this.seoIndicatorLength <= 100 * this.divideRation) {
                        this.cssClass = 'warning';
                    } else if(this.seoIndicatorLength  > 100 * this.divideRation && this.seoIndicatorLength <= 160 * this.divideRation) {
                        this.cssClass = 'success';
                    } else if(this.seoIndicatorLength  > 160 * this.divideRation && this.seoIndicatorLength <= 170 * this.divideRation) {
                        this.cssClass = 'warning';
                    } else if(this.seoIndicatorLength  > 170 * this.divideRation && this.seoIndicatorLength <= this.maxAllowedChar * this.divideRation) {
                        this.cssClass = 'error';
                    }
                }

            }
        }
    }
</script>

<style scoped>

</style>
