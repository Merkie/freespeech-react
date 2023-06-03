import { useEffect, useState } from "react";
import type { Tile } from "../utils/types";

const useTileEdit = ({
  activeAppMode,
  activeEditModeTool,
  activeEditModeTile,
  addEdit,
  props,
}: {
  activeAppMode: string;
  activeEditModeTool: string;
  activeEditModeTile: string;
  addEdit: (tile: Tile) => void;
  props: Tile;
}) => {
  const [editedTileText, setEditedTileText] = useState<string>(props.text);
  const [editsBegun, setEditsBegun] = useState<boolean>(false);

  useEffect(() => {
    if (
      activeAppMode === "edit" &&
      // activeEditModeTool === "text" &&
      activeEditModeTile === `${props.x} ${props.y} ${props.subpageIndex}`
    ) {
      setEditsBegun(true);
    } else if (editsBegun) {
      console.log("useTileEdit add edit call", {
        ...props,
        text: editedTileText,
      });
      addEdit({ ...props, text: editedTileText });
      setEditsBegun(false);
    }
  }, [
    activeAppMode,
    activeEditModeTool,
    activeEditModeTile,
    props.x,
    props.y,
    props.subpageIndex,
    editedTileText,
    props,
    editsBegun,
    addEdit,
  ]);

  return { editedTileText, setEditedTileText };
};

export default useTileEdit;
