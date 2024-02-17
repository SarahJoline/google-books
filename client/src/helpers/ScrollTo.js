const scrollTo = (ref) => {
  ref.current?.scrollIntoView({ behavior: "instant" });
};

export default scrollTo;
