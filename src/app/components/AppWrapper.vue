<template>
  <main>
    <p class="text-red-300">to utc {{ utcDateTime }}</p>
    <p>utc to zone {{ zoneTime }}</p>
    <p>hours per day: {{ dstTime }}</p>
  </main>
</template>

<script setup lang="ts">
import {toUtc, utcToZone, dstOffset} from "&/utils/datetime"

const currentDateTime = new Date()

const utcDateTime = computed(() => toUtc(currentDateTime))

const zoneTime = computed(() => utcToZone(utcDateTime.value, 'America/New_York'))

const dstTime = computed(() => dstOffset(utcDateTime.value))

</script>