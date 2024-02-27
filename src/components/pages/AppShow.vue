<template>
    <div class="main-panel" :class="{ active: getMenuStatus }">
        <main class="main-content">
            <div class="page-header">
                <header class="u-width-100">
                    <h1>{{page_title}}</h1>
                    <div class="button-group" v-if="components.show">
                        <div v-for="(button, index) in components.show.buttons" :key="'nav-button-' + index">

                            <template v-if="button.type === 'edit'">
                                <router-link class="btn solid-green" :to="button.url">{{button.text}}</router-link>
                            </template>
                            <template v-if="button.type === 'close'">
                                <router-link class="btn outline-red" :to="button.url">{{button.text}}</router-link>
                            </template>
                        </div>
                    </div>
                </header>
            </div>
            <div class="row">
                <template v-if="components.show">
                    <div class="col-lg-12">
                        <div class="card">
                            <div class="card-body">
                                <h5 class="card-title"></h5>
                                <hr>
                                <div class="row">
                                    <div v-for="(item, key) in components.show.groups.items" :key="'show-heading-' + key">

                                        <template v-if="item.type === 'default'">
                                            <div class="col-6 col-lg-6 col-md-6">
                                                <h3 class="card__subtitle" style="font-size: 15px;">{{item.label}}</h3>
                                                <div class="bs-callout bs-callout-info">
                                                    <template v-if="key === 'id'">
                                                        <span class="badge badge-pill badge-warning">{{item.value}}</span>
                                                    </template>
                                                    <template v-else>
                                                        <template v-if="item.value === null || item.value == ''">
                                                            <p class="text-danger">-</p>
                                                        </template>
                                                        <template v-else>
                                                            <p class="">{{item.value}}</p>
                                                        </template>
                                                    </template>

                                                </div>
                                            </div>
                                        </template>
                                        <template v-if="item.type === 'text'">
                                            <div class="col col-lg-12 col-md-12">
                                                <h3 class="card__subtitle" style="font-size: 15px;">{{item.label}}</h3>
                                                <div class="bs-callout bs-callout-info">
                                                    <hr>
                                                    <template v-if="item.value === null || item.value == ''">
                                                        <p class="text-danger">-</p>
                                                    </template>
                                                    <template v-else>
                                                        <p class="">{{item.value}}</p>
                                                    </template>
                                                </div>
                                            </div>
                                        </template>
                                        <template v-if="item.type === 'status'">
                                            <div class="col-6 col-lg-6 col-md-6">
                                                <h3 class="card__subtitle" style="font-size: 15px;">{{item.label}}</h3>
                                                <div class="bs-callout bs-callout-info">
                                                    <template v-if="item.value === null || item.value == ''">
                                                        <p class="text-danger">-</p>
                                                    </template>
                                                    <template v-else>
                                                        <p class="">{{item.value}}</p>
                                                    </template>
                                                </div>
                                            </div>
                                        </template>

                                        <template v-if="item.type === 'date'">
                                            <div class="col-12 col-lg-12 col-md-12">
                                                <h3 class="card__subtitle" style="font-size: 15px;">{{item.label}}</h3>
                                                <v-calendar mode="date" :masks="{ title: 'dd.MM.yyyy' }" is-expanded></v-calendar>
                                            </div>
                                        </template>

                                        <template v-if="item.type === 'datetime'">
                                            <div class="col-12 col-lg-12 col-md-12">
                                                <h3 class="card__subtitle" style="font-size: 15px;">{{item.label}}</h3>
                                                <v-calendar :masks="{ title: 'dd.MM.yyyy H:i:s' }" is-expanded></v-calendar>
                                                <v-date-picker mode="dateTime" :locale="bg" :timezone="local" :value="item.value" is24hr is-expanded />
                                            </div>
                                        </template>

                                        <template v-if="item.type === 'color'">
                                            <div class="col-6 col-lg-6 col-md-6">
                                                <h3 class="card__subtitle" style="font-size: 15px;">{{item.label}}</h3>
                                                <div class="bs-callout bs-callout-info">
                                                    <template v-if="item.value === null || item.value == ''">
                                                        <p class="text-danger">-</p>
                                                    </template>
                                                    <template v-else>
                                                        <p class="">{{item.value}}</p>
                                                    </template>
                                                </div>
                                            </div>
                                        </template>
                                        <template v-if="item.type === 'cover'">
                                            <div class="col-6 col-lg-6 col-md-6">
                                                <h3 class="card__subtitle" style="font-size: 15px;">{{item.label}}</h3>
                                                <div class="bs-callout bs-callout-info">
                                                    <template v-if="item.value === null || item.value == ''">
                                                        <p class="text-danger">-</p>
                                                    </template>
                                                    <template v-else>
                                                        <p class="">{{item.value}}</p>
                                                    </template>
                                                </div>
                                            </div>
                                        </template>
                                        <template v-else>

                                        </template>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </template>
            </div>
        </main>
    </div>
</template>

<script>
    import Vue from 'vue';
    import {mapState, mapGetters} from 'vuex';
    import VCalendar from 'v-calendar';

    Vue.component('v-calendar', VCalendar);
    Vue.use(VCalendar);

    export default {
        name: "app-show",
        props: {

        },
        components: {
            VCalendar
        },
        data () {
            return {
                date: null
            };
        },
        computed: {
            ...mapState([
                'components',
                'page_title',
                'languages',
            ]),
            ...mapGetters(['getMenuStatus']),
        },
        methods: {

        }
    }
</script>

<style scoped>
.bs-callout {
    padding: 10px;
    margin: 10px 0;
    border: 1px solid #eee;
    border-left-width: 5px;
    border-radius: 3px;
}
.bs-callout h4 {
    margin-top: 0;
    margin-bottom: 5px;
}
.bs-callout p:last-child {
    margin-bottom: 0;
}
.bs-callout code {
    border-radius: 3px;
}
.bs-callout+.bs-callout {
    margin-top: -5px;
}
.bs-callout-default {
    border-left-color: #777;
}
.bs-callout-default h4 {
    color: #777;
}
.bs-callout-primary {
    border-left-color: #428bca;
}
.bs-callout-primary h4 {
    color: #428bca;
}
.bs-callout-success {
    border-left-color: #5cb85c;
}
.bs-callout-success h4 {
    color: #5cb85c;
}
.bs-callout-danger {
    border-left-color: #d9534f;
}
.bs-callout-danger h4 {
    color: #d9534f;
}
.bs-callout-warning {
    border-left-color: #f0ad4e;
}
.bs-callout-warning h4 {
    color: #f0ad4e;
}
.bs-callout-info {
    border-left-color: #5bc0de;
}
.bs-callout-info h4 {
    color: #5bc0de;
}
.input-style {
    display: inline-block;
    padding: 5px;
    font-size: 16px;
    line-height: 16px;
    background-color: #ffffff;
    border: 1px solid #B7B7B7;
    border-radius: 4px;
}
</style>
