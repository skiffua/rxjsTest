<script lang="ts">
    import Vue from 'vue';
    import { Observable, Observer } from "rxjs";
    import "rxjs/add/observable/from";

    interface observeData {
        observe: number[] | null;
        observeActiveValue: number | null
    }

    export default Vue.extend({
        name: "Rxjs",
        data(): observeData {
          return {
              observe: null,
              observeActiveValue: null
          }
        },

        created() {

        },

        computed: {
        },

        methods: {
            initObservableClass() {
                let numbers = [1, 5, 10];
                this.observe = numbers;
                let source = Observable.from(numbers);

                class MyObserver implements Observer {
                    activeValue: number | null;
                    constructor() {
                        this.activeValue = null;
                    }
                    next(value: number) {
                        // eslint-disable-next-line no-console
                        console.log(value)
                    }
                    error(error: any) {
                        return error;
                    }
                    complete() {
                        return 'complete';
                    }
                }
                let observe = new MyObserver();

                source.subscribe(observe);
            },

            initObservableFunctions() {
                let numbers = [1, 5, 10, 5];
                this.observe = numbers;
                let source = Observable.from(numbers);
                let step = 0;

                source.subscribe(
                    v => {
                        let activeV = v;  step++;
                        setTimeout(() => {this.observeActiveValue = activeV}, step*1000);
                        // eslint-disable-next-line no-console
                        console.log(v);
                    }
                );
            },

            initObservableWithCreate() {
                let numbers = [1, 5, 10];
                this.observe = numbers;
                // deprecated
                let source = Observable.create(observer => {

                    for (let n of numbers) {
                        observer.next(n)
                    }

                    observer.complete()
                });

                source.subscribe(
                    v => {
                        // eslint-disable-next-line no-console
                        console.log(v);
                    }
                );
            }
        }
    })
</script>

<template>
    <div>
        <label>Observer
            <input class="text" type="text" :value="observe">
        </label>
        <label>Active value
            <input class="text" type="text" :value="observeActiveValue">
        </label>
        <br />

        <button type="button" @click="initObservableClass">Create observable with class</button>
        <button type="button" @click="initObservableFunctions">Create observable with functions</button>
        <button type="button" @click="initObservableWithCreate">Create observable with create method</button>

    </div>
</template>


<style scoped>

</style>
