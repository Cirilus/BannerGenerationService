.PHONY: install-submodules
install-submodules:
	git submodule update --init --recursive

.PHONY: update-submodules
update-submodules:
	git submodule update --remote --recursive