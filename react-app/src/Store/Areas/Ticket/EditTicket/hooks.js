import React from "react";
import { HookApiClient } from "../../../apiClient";

export const useEditEvent = () => {
    const onSubmitEdit = React.useCallback(async ({...ticket})=>{
        const apiClient = new HookApiClient()
        console.log(ticket)

        await apiClient.put("api/ticket",{...ticket})
        return true
    },[])

    const onSubmitDelete = React.useCallback(async ({...ticket})=>{
        const apiClient = new HookApiClient()

        await apiClient.delete("api/ticket",{...ticket})
        return true
    },[])

  return {
    onSubmitEdit,
    onSubmitDelete
  };
};
