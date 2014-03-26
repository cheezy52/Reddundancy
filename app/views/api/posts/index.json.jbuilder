json.page(params[:page])
json.total_pages(posts.total_pages)
json.posts posts, partial: "post", as: :post