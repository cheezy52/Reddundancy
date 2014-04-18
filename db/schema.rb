# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20140418215401) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "comments", force: true do |t|
    t.text     "body",       null: false
    t.integer  "owner_id",   null: false
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "post_id",    null: false
    t.integer  "parent_id"
  end

  add_index "comments", ["owner_id"], name: "index_comments_on_owner_id", using: :btree
  add_index "comments", ["parent_id"], name: "index_comments_on_parent_id", using: :btree
  add_index "comments", ["post_id"], name: "index_comments_on_post_id", using: :btree

  create_table "posts", force: true do |t|
    t.string   "link"
    t.integer  "owner_id",   null: false
    t.integer  "sub_id"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "title",      null: false
    t.text     "body"
  end

  add_index "posts", ["owner_id"], name: "index_posts_on_owner_id", using: :btree
  add_index "posts", ["sub_id"], name: "index_posts_on_sub_id", using: :btree

  create_table "sub_reddits", force: true do |t|
    t.string   "name",                        null: false
    t.integer  "owner_id",                    null: false
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "slug"
    t.integer  "followers_count", default: 0, null: false
  end

  add_index "sub_reddits", ["name"], name: "index_sub_reddits_on_name", using: :btree
  add_index "sub_reddits", ["owner_id"], name: "index_sub_reddits_on_owner_id", using: :btree
  add_index "sub_reddits", ["slug"], name: "index_sub_reddits_on_slug", unique: true, using: :btree

  create_table "user_subs", force: true do |t|
    t.integer  "user_id",    null: false
    t.integer  "sub_id",     null: false
    t.integer  "rank",       null: false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "user_subs", ["sub_id", "user_id"], name: "index_user_subs_on_sub_id_and_user_id", using: :btree
  add_index "user_subs", ["user_id", "sub_id"], name: "index_user_subs_on_user_id_and_sub_id", using: :btree

  create_table "users", force: true do |t|
    t.string   "username",        null: false
    t.string   "email",           null: false
    t.string   "password_digest", null: false
    t.string   "session_token"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "users", ["session_token"], name: "index_users_on_session_token", using: :btree
  add_index "users", ["username"], name: "index_users_on_username", unique: true, using: :btree

  create_table "votes", force: true do |t|
    t.boolean  "up",           null: false
    t.integer  "owner_id",     null: false
    t.integer  "votable_id",   null: false
    t.string   "votable_type", null: false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "votes", ["owner_id"], name: "index_votes_on_owner_id", using: :btree
  add_index "votes", ["votable_id", "owner_id"], name: "index_votes_on_votable_id_and_owner_id", using: :btree
  add_index "votes", ["votable_id"], name: "index_votes_on_votable_id", using: :btree

end
