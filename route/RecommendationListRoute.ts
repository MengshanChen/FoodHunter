import * as express from 'express';
import { RecommendationListModel } from '../model/RecommendationListModel';

// Creates and configures an ExpressJS web server.
class RecommendationList {

    public recommendationList: RecommendationListModel;
    private idGenerator: number;

    //Run configuration methods on the Express instance.
    constructor() {
        this.recommendationList = new RecommendationListModel();
        this.idGenerator = 1000;
    }

    public registerRoutes(router: express.Router) {
        this.routes(router);
    }

    // Configure API endpoints.
    private routes(router: express.Router): void {
        //get by id
        router.get('/recommendationlist/:recommendationlistID', (req, res) => {
            var recommendationlistID = +req.params.recommendationlistID;
            console.log('try to get listID:', recommendationlistID);
            this.recommendationList.getrecommendationListByID(res, recommendationlistID);
        });

        //get by tagListid
        router.get('/recommendationlist/tagList/:tagListID', (req, res) => {
            var taglistID: number = +req.params.tagListID;
            console.log('try to get taglistID:', taglistID);
            this.recommendationList.getrecommendationListByTagListID(res, taglistID);
        });

        router.delete('/recommendationlist/:recommendationlistID', (req, res) => {
            var recommendationlistID: number = +req.params.recommendationlistID;
            console.log('try to delete listID:', recommendationlistID);
            this.recommendationList.deleteRecommendationList(res, recommendationlistID);
        });

        router.put('/recommendationlist/:recommendationlistID', (req, res) => {
            var recommendationlistID: number = +req.params.recommendationlistID;
            console.log('try to update:', recommendationlistID);
            var newrecommendationList = req.body;
            this.recommendationList.updateRecommendationList(res, recommendationlistID, newrecommendationList);
        });

        router.put('/recommendationlist/tagList/:tagListID', (req, res) => {
            var tagListID: number = +req.params.tagListID;
            console.log('try to update:', tagListID);
            var newrecommendationList = req.body;
            console.log('get list from service in route:', newrecommendationList);
            this.recommendationList.updateRecommendationListByTagListID(res, tagListID, newrecommendationList);
        });

        router.post('/recommendationlist', (req, res) => {
            var newrecommendationList = req.body;
            newrecommendationList.recommendationlistID = this.idGenerator + newrecommendationList.foodietaglistID;
            console.log('try to create:', newrecommendationList.recommendationlistID);
            this.recommendationList.createRecommendationList(res, newrecommendationList);
        });
    }
}

export { RecommendationList };