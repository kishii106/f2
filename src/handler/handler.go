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

func GetNeighborMenus(w http.ResponseWriter, r *http.Request) {
    menus := model.GetNeighborMenus();
    webutil.WriteJsonResponse(w, menus)
}

func TryLogin(w http.ResponseWriter, r *http.Request) {
    familyName := r.FormValue("familyName")
    password := r.FormValue("password")
    success := model.TryLogin(familyName, password)
    webutil.WriteJsonResponse(w, map[string]bool{"success": success})
}
