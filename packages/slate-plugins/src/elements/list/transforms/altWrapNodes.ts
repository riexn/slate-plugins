import { Editor, Transforms } from 'slate';
import { getBlockAboveSelection } from 'common';
import {} from '../types';

export const altWrapNodes = (editor: Editor, element: any) => {
  // get selected nodes?

  // unwrap those,
  unwrapList(editor, { typeUl, typeOl, typeLi });
  //
  Transforms.setNodes(editor, {
    type: typeP,
  });

  //   const selectedNodes = getBlockAboveSelection(editor);

  //   console.log('selectedNodes', selectedNodes);

  const { selection } = editor;
  console.log(selection!.anchor.path);
  console.log(editor.children);
  const selected = editor.children[selection!.anchor.path[0]];
  console.log(selected);
  return;

  const wrapperPath = selection!.anchor.path;
  // insert a new node above the selection
  Transforms.splitNodes(editor, { at: wrapperPath });
  // modify the wrapper's path, then update :)
  console.log(wrapperPath);
  wrapperPath.pop();
  console.log(wrapperPath);
  Transforms.setNodes(editor, { type: 'ul', children: [] }, { at: [0, 1] });
  // get the toggled node's new location :)
  Transforms.insertNodes(
    editor,
    { type: 'li', children: [] },
    { at: [0, 1, 0] }
  );
  //   Transforms.moveNodes(editor, { at: [0, 1, 0], to: [0, 1, 0, 1] });

  console.log('HEY!');
  // insert node at the path
  //   Transforms.insertNodes(
  //     editor,
  //     { type: 'p', children: [] },
  //     { at: wrapperPath }
  //   );

  console.log(selection);
  // insert a new node that contains the wrapper

  // for each selected node, get a copy of its properties, then insert it inside the wrapper
};

export const altMoveNodes = () => {};

const test = (editor: Editor) => {
  // get the block and its path
  const [block, path] = getBlockAboveSelection(editor);
  // set the current node to the type of the list
  Transforms.setNodes(editor, { type: typeList });
  // define the list item path
  const indentedPath = [...path, 0];
  // create the new element in the list, with the children that were in it, to maintain the marks
  const listItem = {
    type: typeLi,
    children: [{ children: [{ type: 'p', children: block.children }] }],
  };
  Transforms.insertNodes(editor, listItem, { at: indentedPath });
};
