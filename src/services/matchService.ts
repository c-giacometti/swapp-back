import * as matchRepository from "../repositories/matchRepository";
import * as userService from "../services/userService";

export async function getMatchs(
    userId: number
) {
    //check if user exists
    await userService.findUser(userId);

    //find user matchs
    const matchs = await matchRepository.findUserMatchs(userId);

    const filterMatchs = matchs.filter((e) => {
        return e.LikesId.LikingProductId.userId === userId
    });

    return filterMatchs;

}