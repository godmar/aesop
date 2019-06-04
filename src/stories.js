
const allStories = (ctx => {
  const values = ctx.keys().map(el => ({
    index: el.replace('./', '').replace('/meta.json', ''),
    value: ctx(el)
  }));
  values.sort((a, b) => Number(a.index) - Number(b.index));
  return values.map(obj => obj.value);
})(require.context('../content', true, /\/meta\.json/));

export default allStories.slice(0, 147);
