import handler from "../util/templates/handler";
import getAllUsers from "../util/usersTableUtils/getAllUsers";
import setUserGithubTokens from '../util/usersTableUtils/setUserGithubTokens';
import parseQueryParams from '../util/parseQueryParams';
import githubCalls from '../util/github/githubCalls';
const { refreshTokens } = githubCalls;

export const main = handler(async (event) => {
  const users = await getAllUsers();
  const tokenRefreshPromises = users.map(user => {
      const { refreshToken } = user;
      return refreshTokens({ refreshToken }).then((responseData) => {
                                              responseData = parseQueryParams(responseData);
                                              const newAccessToken = responseData.access_token;
                                              const newRefreshToken = responseData.refresh_token;
                                              if (newAccessToken && newRefreshToken) {
                                                return setUserGithubTokens({userId: user.userId, accessToken: newAccessToken, refreshToken: newRefreshToken});
                                              } else {
                                                return `Problem refreshing token for user ${user.userId}`;
                                              }
                                            });
  });

  const refreshResults = await Promise.allSettled(tokenRefreshPromises);
  console.log(refreshResults);
});
