package model

import (
    "time"
    "sort"

    "github.com/naoina/genmai"
)

type Menu struct {
    Id   int64  `db:"pk" json:"id"`
    Name string `json:"name"`
    PopularLevel int32 `default: 0`
    Created time.Time `json:"created"`
    Updated time.Time `json:"updated"`
}

func (e *Menu) setCreatedAt(t time.Time) {
    e.Created = t
}

func (e *Menu) setUpdatedAt(t time.Time) {
    e.Updated = t
}

func (e *Menu) BeforeInsert() error {
    return beforeInsertCore(e)
}

func (e *Menu) BeforeUpdate() error {
    return beforeUpdateCore(e)
}

type menus []Menu

func (m menus) Len() int {
    return len(m)
}

func (m menus) Swap(i, j int) {
    m[i], m[j] = m[j], m[i]
}

func (m menus) Less(i, j int) bool {
    return m[i].Name < m[j].Name
}

func GetAllMenus() []Menu {
    var ret []Menu
    err := db.Select(&ret)
    if err != nil {
        panic(err)
    }
    return ret
}

func GetNeighborMenus() []Menu {
    var ret menus
    if err := db.Select(&ret, db.OrderBy("popular_level", genmai.DESC).Limit(10)); err != nil { // この抽出の仕方はとても面白くない結果になるので、改良したい.
        panic(err)
    }

    sort.Sort(ret);
    return ret
}
