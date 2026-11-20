export default {
  fetch(request, env) {
    const url = new URL(request.url);
    if (url.hostname === 'dubovyyhay.com') {
      url.protocol = 'https:';
      url.hostname = 'www.dubovyyhay.com';
      url.port = '';
      return Response.redirect(url, 308);
    }

    return env.ASSETS.fetch(request);
  },
};
