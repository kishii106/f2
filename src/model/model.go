package model

import (
    "os"
    "time"
    "math/rand"
    "fmt"

    _ "github.com/mattn/go-sqlite3"
    _ "github.com/lib/pq"
    "github.com/naoina/genmai"

    "../env"
)

var (
    db *genmai.DB
)

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
    if err := db.CreateTableIfNotExists(&Family{}); err != nil {
        panic(err)
    }

    insertTestData()
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

func insertTestData() {
    rand.Seed(time.Now().UnixNano())
    if _, err := db.Insert(&Menu{Name: fmt.Sprintf("%d", rand.Int31n(9999)), PopularLevel: rand.Int31n(99) + 1}); err != nil {
        panic(err)
    }
    if _, err := db.Insert(&Family{Name: "jabara", Password: "jabara"}); err != nil {
        fmt.Println(err)
    }
}
