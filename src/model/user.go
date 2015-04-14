package model

import (
    "time"
)

type User struct {
    Id   int64  `db:"pk" json:"id"`
    Name string `db:"unique" json:"name"`
    Password string
    Created time.Time `json:"created"`
    Updated time.Time `json:"updated"`
}

func (e *User) setCreatedAt(t time.Time) {
    e.Created = t
}

func (e *User) setUpdatedAt(t time.Time) {
    e.Updated = t
}

func (e *User) BeforeInsert() error {
    return beforeInsertCore(e)
}

func (e *User) BeforeUpdate() error {
    return beforeUpdateCore(e)
}
