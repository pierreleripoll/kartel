<template>
  <!--
    The text of a Markdown file. A video in the text starts a block with two
    columns: the video on the left, the text that follows on the right.
    The block ends at the next video, or at a line (--- in Markdown).
  -->
  <div class="page-body">
    <template
      v-for="(block, index) in blocks"
      :key="index"
    >
      <div
        v-if="block.video"
        class="content-grid"
      >
        <ContentRenderer
          :value="toBody([block.video])"
          class="video-column"
        />
        <ContentRenderer
          :value="toBody(block.nodes)"
          class="prose"
        />
      </div>
      <ContentRenderer
        v-else
        :value="toBody(block.nodes)"
        class="prose"
      />
    </template>
  </div>
</template>

<script setup lang="ts">
import type { MinimarkNode, MinimarkTree } from '@nuxt/content'

const props = defineProps<{
  /** The `body` of a page of Nuxt Content. */
  body: MinimarkTree
}>()

interface Block {
  video?: MinimarkNode
  nodes: MinimarkNode[]
}

function tagOf(node: MinimarkNode): string | undefined {
  return Array.isArray(node) ? node[0] : undefined
}

const blocks = computed(() => {
  const all: Block[] = []
  let current: Block = { nodes: [] }
  const close = (next: Block) => {
    if (current.video || current.nodes.length) all.push(current)
    current = next
  }
  for (const node of props.body.value) {
    const tag = tagOf(node)
    if (tag === 'youtube-lite') close({ video: node, nodes: [] })
    // The line that ends a video block is not drawn. The other lines are.
    else if (tag === 'hr' && current.video) close({ nodes: [] })
    else current.nodes.push(node)
  }
  close({ nodes: [] })
  return all
})

function toBody(nodes: MinimarkNode[]) {
  return { body: { type: 'minimark', value: nodes } }
}
</script>

<style scoped>
.content-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--gap);
  margin: 20px 0;
}

.video-column {
  margin: 30px 0;
}

.prose :deep(hr) {
  border: none;
  border-top: 1px solid var(--color-text);
  margin: 30px 0;
}

@media (max-width: 768px) {
  .content-grid {
    grid-template-columns: 1fr;
    gap: 20px;
  }

  .video-column {
    margin: 10px 0 0;
  }
}
</style>
