<script></script>

<template>
  <header>
    <SignedOut>
      <nav class="w-full flex justify-between bg-amber-100 px-40 text-black h-20">
        <div>
          Logo
        </div>
        <button class="bg-gray rounded">
          <UButton to="/login">
            Entrar
          </UButton>
        </button>
      </nav>
    </SignedOut>
    <SignedIn>
      <UserButton />
    </SignedIn>
  </header>
  <h1>tela index - Dashboard</h1>
</template>
