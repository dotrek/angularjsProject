'use strict';

/* Popular Movies Controller */

movieApp.controller('listController', ['$scope', '$http', '$routeParams',
    function ($scope, $http, $routeParams) {

        var page = 0,
            $year = 2017,
            $url = $apiEndpoint,
            $service = "search/movie";
        $scope.moviesList = [];

        // Set up URL and Page Heading
        switch ($routeParams.page) {
            case 'now-playing':
                $service = 'movie/now_playing';
                $scope.pageHeading = 'Now Playing in Theaters';
                break;
            case 'top-box-office':
                $service = 'discover/movie?primary_release_year=' + $year + '&sort_by=revenue.desc';
                $scope.pageHeading = 'Highest Grossing Movies of 2017';
                break;
            case 'top-rated':
                $service = 'movie/top_rated';
                $scope.pageHeading = 'Top Rated Movies';
                break;
            case 'popular':
                $service = 'movie/popular';
                $scope.pageHeading = 'Popular Movies';
                break;
            default:
                $service = 'discover/movie';
                $scope.pageHeading = 'All Movies'

        }

        $scope.getMoviesList = function () {

            var $responsePromise;

            // Get data from API
            if ($scope.query == null)
                $responsePromise = $http({
                    method: 'GET',
                    url: $url + $service,
                    params: {
                        api_key: $apiKey,
                    }
                });
            else
                $responsePromise = $http({
                    method: 'GET',
                    url: $url + "search/movie",
                    params: {
                        api_key: $apiKey,
                        query: $scope.query
                    }
                });
            // Process requests
            $responsePromise.then(
                function successCallback(response) {

                    // Pagination Setup
                    page = response.data.page;
                    // Append new movies to the list
                    $scope.moviesList.push.apply($scope.moviesList, response.data.results);


                }, function errorCallback() {
                    console.error($error_noData);
                }
            );
        }

        // Calling the function
        $scope.getMoviesList();
    }
])
