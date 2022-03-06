import Block from '../components/block/Block';

export function renderDOM(root: HTMLElement | null, block: Block) {
  const element = block.getContent();

  if (element && root) {
    root.appendChild(element);
  }

  return root;
}
