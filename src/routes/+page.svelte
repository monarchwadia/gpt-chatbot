<script lang="ts">
	import { getMessages, sendMessage, type ChatMessage } from "src/services/chatService";
	import { onMount } from "svelte";

  let input: HTMLTextAreaElement;
  let chat: Promise<ChatMessage[]> = new Promise(() => {})

  const handleChange = (e: KeyboardEvent) => {
    // if ctrl+enter or cmd+enter is pressed, send the message
    if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
      handleSubmit(e);
    }
  }
  
  const handleSubmit = (e: Event) => {
    e.preventDefault();

    const value = input.value;
    input.value = "";

    chat = sendMessage(value)
  }

  onMount(async () => {
    chat = getMessages();
  })
</script>

<div class="flex flex-col h-full">
  <div class="flex flex-row h-full gap-12">
    <div class="flex flex-col flex-grow gap-6">
      <div class="flex-grow">
        <!-- A list of DaisyUI chat bubbles created from chat messages-->
        {#await chat}
          Loading messages...
        {:then messages}
          {#each messages as message}
            {@const isBot = message.sender === "bot"}
            <div class="chat {isBot ? "chat-start" : "chat-end"}">
              <div class="chat-header">
                {message.sender}
                <time class="text-xs opacity-50">{message.createdAt}</time>
              </div>
              <div class="chat-bubble {isBot ? "chat-bubble-primary" : "chat-bubble-info"}">{message.content}</div>
            </div>
          {/each}
        {/await}
      </div>
      <form class="flex flex-col gap-12" on:submit={handleSubmit}>
        <div>
          <textarea bind:this={input} class="textarea w-full h-32 border border-primary" autofocus on:keydown={handleChange}></textarea>
        </div>
        <input type="submit" class="btn btn-primary" value="Send" />
      </form>
    </div>
    <div class="border border-primary w-1/3"></div>
  </div>
</div>