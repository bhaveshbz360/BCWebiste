(function($){'use strict';$(document).ready(function(){$.fn.serializeObject=function(){var output={};var formData=this.serializeArray();$.each(formData,function(){var fieldName=this.name;var fieldValue=this.value||'';var isArrayField=fieldName.slice(-2)==='[]';if(isArrayField){if(output[fieldName]){output[fieldName].push(fieldValue)}else{output[fieldName]=[fieldValue]}}else{output[fieldName]=fieldValue}});return output};$('.es_ajax_subscription_form').on('submit',function(e){var form=$(this);e.preventDefault();handleBindFunction(form)})});function handleResponse(response,form){var redirection_url=response.redirection_url;if('undefined'!==typeof redirection_url){redirection_url=redirection_url.trim();if(typeof(redirection_url)==='string'&&redirection_url!=''){if(!/^https?:\/\//i.test(redirection_url)){redirection_url="http://"+redirection_url}
window.location.href=redirection_url}}else{var status=response.status;var message_class='success';if(status==='ERROR'){message_class='error'}
var responseText=response.message_text;var messageContainer=$(form).next('.es_subscription_message');messageContainer.attr('class','es_subscription_message '+message_class);messageContainer.html(responseText);var esSuccessEvent={detail:{es_response:message_class,msg:responseText},bubbles:!0,cancelable:!0};$(form).trigger('es_response',[esSuccessEvent])}}
function handleBindFunction(form,is_ig=!1){form=$(form);var formData=form.serializeObject();formData.es='subscribe';formData.action='es_add_subscriber';$.ajax({type:'POST',url:es_data.es_ajax_url,data:formData,dataType:'json',beforeSend:function(){form.find('#spinner-image').show();form.find('.es_submit_button').attr('disabled',!0)},success:function(response){if(!is_ig){if(response&&typeof response.status!=='undefined'&&response.status==="SUCCESS"){form.slideUp('slow');form.hide()}else{form.find('#spinner-image').hide()}}
form.find('.es_submit_button').attr('disabled',!1);jQuery(window).trigger('es.send_response',[form,response]);handleResponse(response,form)},error:function(err){form.find('#spinner-image').hide();form.find('.es_submit_button').attr('disabled',!1);console.log(err,'error')},});return!1}
jQuery(window).on("init.icegram",function(e,ig){if(typeof ig!=='undefined'&&typeof ig.messages!=='undefined'){jQuery('.icegram .es_shortcode_form, .icegram form[data-source="ig-es"]').each(function(i,v){jQuery(v).bind('submit',function(e){e.preventDefault();e.stopImmediatePropagation();var form=$(this);handleBindFunction(form,!0)})})}})})(jQuery)