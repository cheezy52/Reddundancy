json.page(params[:page])
json.total_pages(subs.total_pages)
json.subs subs, partial: "sub", as: :sub
