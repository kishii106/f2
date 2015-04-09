package model

import (
    "os"
    "time"

    _ "github.com/mattn/go-sqlite3"
    _ "github.com/lib/pq"
    "github.com/naoina/genmai"

    "../env"
)

var (
    db *genmai.DB
)

type Menu struct {
    Name string `json:"name"`
    Created time.Time `json:"created"`
    Updated time.Time `json:"updated"`
}

func (menu *Menu) BeforeInsert() error {
    n := time.Now()
    menu.Created = n
    menu.Updated = n
    return nil
}

func (menu *Menu) BeforeUpdate() error {
    n := time.Now()
    menu.Updated = n
    return nil
}

func init() {
    var err error
    db, err = createDb()
    if err != nil {
        panic(err)
    }
    db.SetLogOutput(os.Stdout)
    if err := db.CreateTableIfNotExists(&Menu{}); err != nil {
        panic(err)
    }
    _, err2 := db.Insert(&Menu{Name: "name"})
    if err2 != nil {
        panic(err2)
    }
}

func createDb() (*genmai.DB, error) {
    switch env.DbKind() {
        case env.DbKindSQLite3:
            return genmai.New(&genmai.SQLite3Dialect{}, "./f2.db")
        case env.DbKindPostgreSQL:
            return genmai.New(&genmai.PostgresDialect{}, "host=" + env.PostgresHost() + " dbname=" + env.PostgresDbName() + " user=" + env.PostgresUser() + " password=" + env.PostgresPassword() + " sslmode=" + env.PostgresSslMode())
    }
    panic(env.DbKind())
}

func GetAllMenus() []Menu {
    var ret []Menu
    err := db.Select(&ret)
    if err != nil {
        panic(err)
    }
    return ret
}
