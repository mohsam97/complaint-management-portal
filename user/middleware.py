from django.utils.deprecation import MiddlewareMixin
from rest_framework_simplejwt import authentication
from rest_framework_simplejwt.authentication import JWTAuthentication


class CrossServiceAccountSyncMiddleware(MiddlewareMixin):
    def process_request(self, request):
        if "Authorization" in request.headers:
            print(request.headers["Authorization"])
            print(authentication.JWTAuthentication().authenticate(request))
            # user = JWTAuthentication.get_user(request.headers["Authorization"])
            # print(user)
        # if get_http_authorization(request):
        #     token = get_http_authorization(request)
        #
        #     # Verify token by get_payload method
        #     payload = get_payload(token, request)
        #
        #     # We have a token, lets try to fetch the user from local users repo,
        #     user = get_user_by_token(token, request)
        #
        #     # if user exists, then nothing needs to be done, the per app regular JSONWebTokenMiddleware
        #     # take it from there else try to verify token remotely from centralized auth accounts and sync user:
        #     if user:
        #         assert (user.username != payload['username'], "Username in token payload: " + payload[
        #             'username'] + " is different than locally stored user: " + user.username)
