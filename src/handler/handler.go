package handler

import (
    "net/http"

    "../model"
    "../webutil"
)

func GetAllMenus(w http.ResponseWriter, r *http.Request) {
    menus := model.GetAllMenus()
    webutil.WriteJsonResponse(w, menus)
}
