<template>
    <div></div>
</template>

<script lang="ts">
    import { Observable } from "rxjs/Observable";
    import "rxjs/add/observable/from";

    export default {
        name: "Rxjs",

        created() {
            let numbers = [1, 5, 10];
            let source = Observable.from(numbers);
            // eslint-disable-next-line no-console
            console.log(source)



        },

        methods: {
            test() {

            },
        }
    }
</script>

<style scoped>

</style>