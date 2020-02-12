<template>
    <div>
        <label>Show result for observable
            <input class="text" type="text" :value="observe">
        </label>

    </div>
</template>

<script lang="ts">
    import Vue from 'vue';
    import { Observable } from "rxjs/Observable";
    import "rxjs/add/observable/from";

    interface observeData {
        observe: number | null;
    }

    export default Vue.extend({
        name: "Rxjs",
        data(): observeData {
          return {
              observe: null,
          }
        },

        created() {
            let numbers = [1, 5, 10];
            let source = Observable.from(numbers);

            class MyObserver {
                activeValue: number | null;
                constructor() {
                    this.activeValue = null;
                }

                next(value: number) {
                    this.activeValue = value;
                }
                error(error: any) {
                    return error;
                }
                complete() {
                    return 'complete';
                }
            }
            let observable = new MyObserver();
            this.observe = observable.activeValue;
            // source.subscribe(observable);


            // eslint-disable-next-line no-console
            console.log(source)
        },

        computed: {
        },

        methods: {
            test() {

            },
        }
    })
</script>

<style scoped>

</style>
