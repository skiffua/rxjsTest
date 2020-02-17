<script lang="ts">
    import Vue from 'vue';
    import axios from 'axios';
    import { Observable, Observer, fromEvent } from "rxjs";
    import { map, delay, mergeMap  } from 'rxjs/operators';
    import "rxjs/add/observable/from";

    // import

    interface observeData {
        observe: number[] | null;
        observeActiveValue: number | string | null
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

        mounted() {
            let requestButton: any = this.$refs['requestTest'];

            let click: Observable<Event> = fromEvent(requestButton, 'click');

            click.pipe(mergeMap(
                () => this.load('movies.json'),
            ))
                .subscribe(
                    (val2, numb) => {
                        // eslint-disable-next-line no-console
                        console.log(numb);
                        return this.renderMovies(val2)
                    }
            )
        },

        computed: {
        },

        methods: {
            initObservableClass() {
                let numbers = [1, 5, 10];
                this.observe = numbers;
                let source = Observable.from(numbers);

                class MyObserver implements Observer<any> {
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
                let source = Observable.create((observer: any) => {

                    for (let n of numbers) {
                        observer.next(n)
                    }

                    observer.complete()
                });

                source.subscribe(
                    (v: any) => {
                        // eslint-disable-next-line no-console
                        console.log(v);
                    }
                );
            },

            testOperators () {
                let numbers = [1, 5, 10];
                this.observe = numbers;
                // deprecated
                let source = new Observable(observer => {

                    for (let n of numbers) {
                        observer.next(n)
                    }

                    observer.complete()
                }).pipe(map((v: any) => v*2));

                source.subscribe(
                    (v: any) => {
                        // eslint-disable-next-line no-console
                        console.log(v);
                        this.observeActiveValue += ' ' + v;
                    }
                );
            },

            onCircle() {
                let circle: any = this.$refs['circle'];
                // eslint-disable-next-line no-console
                console.log(circle);
                let source: Observable<any> = fromEvent(document, 'mousemove')
                    .pipe(map((e: any) => {
                        return {
                            x: e.clientX,
                            y: e.clientY
                        }
                    }),
                    delay(300)
                    );

                function onNext(value: {x: number; y: number}) {
                    // eslint-disable-next-line no-console
                    console.log(value);
                    circle.style.backgroundColor = 'green';
                    circle.style.left = value.x - 10 + 'px';
                    circle.style.top = value.y -10 + 'px';
                }

                source.subscribe(
                    onNext,
                    // v => {
                    //     // eslint-disable-next-line no-console
                    //     console.log(v);
                    // }
                );
            },

            onGetData() {

            },

            load(url: string) {
                return new Observable(async(observe) => {

                    // eslint-disable-next-line no-console
                    console.log('get');

                    await axios
                        .get(url)
                        .then(response => {

                            observe.next(response.data);
                            observe.complete();
                        })
                })
            },

            renderMovies(movies: Array) {
                // eslint-disable-next-line no-console
                console.log(movies);
                let output: any = this.$refs['movies'];

                movies.forEach((m: { title: string }) => {
                    let div = document.createElement('div');
                    div.innerText = m.title;
                    output.appendChild(div);
                });
            }
        }
    })
</script>

<template>
    <div id="root">
        <div ref="circle" id="circle"></div>

        <label>Observer
            <input class="text" type="text" :value="observe">
        </label>
        <label>Active value
            <input class="text" type="text" :value="observeActiveValue">
        </label>
        <br />
        <div ref="movies"></div>
        <br />

        <button type="button" @click="initObservableClass">Create observable with class</button>
        <button type="button" @click="initObservableFunctions">Create observable with functions</button>
        <button type="button" @click="initObservableWithCreate">Create observable with create method</button>
        <button type="button" @click="testOperators">Using operators</button>
        <button type="button" @click="onCircle">Circle run</button>
        <button type="button" @click="onGetData" ref="requestTest">Get data</button>

    </div>
</template>


<style scoped>
    #root {
        /*position: relative;*/
    }

    #circle {
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background-color: red;
        position: absolute;
    }

</style>
