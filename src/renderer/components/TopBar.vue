<template>
    <header class="bg-white px-8 py-2 shadow w-full">
      <div class="flex justify-between items-center leading-none">
        <div class="flex-1">
            <div class="flex items-center">
                <img src="../assets/images/logo.png" class="h-12 " />
                <h1 class="flex-2 pl-4 text-4xl">Barstaat</h1>
            </div>
        </div>
        
        <slot></slot>
      </div>
    </header>
</template>

<script>
export default {
}
</script>
