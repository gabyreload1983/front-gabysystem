import { useEffect, useState } from "react";
import { getReplacementsByServiceWork } from "../utils/data";

export function useReplacements({ id }) {
  const [replacements, setReplacements] = useState(null);

  const getReplacements = async () => {
    const dataReplacements = await getReplacementsByServiceWork(id);
    setReplacements(dataReplacements);
  };

  useEffect(() => {
    getReplacements();
  }, [id]);

  return { replacements, getReplacements };
}
