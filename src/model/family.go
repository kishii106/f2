package model

import (
    "time"
)

type Family struct {
    Id   int64  `db:"pk" json:"id"`
    Name string `db:"unique" json:"name"`
    Password string
    Created time.Time `json:"created"`
    Updated time.Time `json:"updated"`
}

func (e *Family) setCreatedAt(t time.Time) {
    e.Created = t
}

func (e *Family) setUpdatedAt(t time.Time) {
    e.Updated = t
}

func (e *Family) BeforeInsert() error {
    return beforeInsertCore(e)
}

func (e *Family) BeforeUpdate() error {
    return beforeUpdateCore(e)
}

func TryLogin(familyName string, password string) bool {
    var family []Family
    if err := db.Select(&family, db.Where("name", "=", familyName).And(db.Where("password", "=", password))); err != nil {
        panic(err)
    }
    return len(family) == 1
}
