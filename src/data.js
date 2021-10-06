const items = [
  { id: 1, name: "Item 1" },
  { id: 2, name: "Item 2", parent: 1 },
  { id: 3, name: "Item 3", parent: 1  },
  { id: 4, name: "Item 4", parent: 3  },
  { id: 5, name: "Item 5"},
];

const getTree = (rawData) => {
  const result = [];
  const addedChildren = rawData.map((o) => {
    o.children = [];
    return o;
  });
  addedChildren.map((o) => {
    if (o.parent) {
      const parent = addedChildren.find((el) => el.id === o.parent);
      parent.children.push(o);
      return;
    }
    result.push(o);
    return o;
  });

  return result;
};

const result = getTree(items);

console.log(result);
