module ApplicationHelper
  def csrf_token
    "<input type='hidden' name='authenticity_token'
      value=#{form_authenticity_token}></input>".html_safe
  end
end
