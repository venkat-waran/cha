import { useMemo, useEffect } from 'react';

export const useCategoriesHook = ({
  Dash_hoc: {
    actions: { GET_MISSION_CATEGORIES_API_CALL },
  },
  Dash_data: { GET_MISSION_CATEGORIES_API },
  getData,
}) => {
  // const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    GET_MISSION_CATEGORIES_API_CALL();
  }, []);

  // useEffect(() => {
  //   if (
  //     selected &&
  //     Object.keys(selected).length &&
  //     categoriesList.data.length
  //   ) {
  //     const selectedCat = categoriesList.data.find(
  //       (cat) => +cat.id === +selected.id,
  //     );
  //     setSelectedCategory(selectedCat);
  //   }
  // }, [selected, categoriesList]);

  const categoriesList = useMemo(
    () => getData(GET_MISSION_CATEGORIES_API, [], false),
    [GET_MISSION_CATEGORIES_API],
  );

  return {
    categories: {
      data: categoriesList.data,
      loader: categoriesList.loader,
      // selected: selectedCategory,
    },
  };
};
