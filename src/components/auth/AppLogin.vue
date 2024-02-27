<template>
    <div class="u-hidden cover" style="background: url('assets/pics/background.jpg')">
      <main class="main-content">
        <div class="row">
          <div class="col-sm-6 col-md-6 col-lg-3 u-fixed">
            <div class="row card">
              <div class="card__body">
                <div class="logo u-mt-30 u-ctx">
                  <img src="assets/logo/login-logo.png" alt="">
                </div>
                <div class="row">
                  <div class="col-lg-12 u-plr-30 u-min-width-300">
                    <form class="card__items">
                      <div class="form-group u-p-0">
                        <label class="c-secondary">E-mail адрес</label>
                        <input type="text"
                               class="form-control"
                               placeholder="email@email.com"
                               >
                      </div>
                      <div class="form-group">
                        <label class="c-secondary">Парола</label>
                        <input type="password"
                               class="form-control"
                               placeholder="*******"
                              >
                      </div>
                      <div class="button-group u-ctx">
                        <button class="btn solid-blue" @click.prevent="login" >Вход</button>
                        <!--<router-link class="btn solid-blue" :to="{name: 'admin'}">Вход</router-link>-->
                      </div>
                    </form>
                    <div class=" copyrights u-text-12 u-mb-10 c-grey">
                      <span>&copy; Kipo Engine 2020</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
</template>


<script>
    import {mapActions} from 'vuex';
    export default {
        name: "app-login",
        // mounted() {
        //     this.getRoutes(this.$router);
        // },

        methods: {
            ...mapActions(['getRoutes', 'getItems']),
             async login() {
                 // this.getRoutes(this.$router);
                 //     this.getRoutes(this.$router).then((routes) => {
                 //         console.log(routes);
                 //         this.$router.push('/admin/pages');
                 //
                 //     });

                 await this.getRoutes(this.$router);
                 await this.$router.push('/admin/pages');

                // this.loginUser();
            }
        }
    }
</script>

<style scoped>

</style>