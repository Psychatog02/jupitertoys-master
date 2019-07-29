SHELL = /bin/sh
export MAKER_VERSION=master

DOCKER_IMAGE_NAME=jupitertoys/website-service
DOCKER_CONTAINER_NAME=jupitertoys-website-service
DOCKER_PUBLIC_PORT=49160
DOCKER_PRIVATE_PORT=8080

TARGET_DOCKER_REGISTRY=773345442268.dkr.ecr.ap-southeast-2.amazonaws.com
SOURCE_VERSION?=latest
TARGET_VERSION?=latest

-include $(shell [ ! -d .maker ] && git clone --branch $(MAKER_VERSION) git@git.planittesting.com:devopswg/maker.git .maker; echo .maker/Makefile)

.PHONY: docker/run/jupitertoys
docker/run/jupitertoys:
	$(DOCKER) run -p $(DOCKER_PUBLIC_PORT):$(DOCKER_PRIVATE_PORT) -d --name $(DOCKER_CONTAINER_NAME) $(DOCKER_IMAGE_NAME)

.PHONY: docker/stop/jupitertoys
docker/stop/jupitertoys:
	$(call pretty-message, Stop Docker container: $(DOCKER_CONTAINER_NAME))
	$(DOCKER) stop $(DOCKER_CONTAINER_NAME)

.PHONY: docker/clean/jupitertoys
docker/clean/jupitertoys: docker/stop/jupitertoys
	$(call pretty-message, Cleanup Docker container: $(DOCKER_CONTAINER_NAME))
	$(DOCKER) rm $(DOCKER_CONTAINER_NAME) --force
	$(DOCKER) rmi $(DOCKER_IMAGE_NAME) --force