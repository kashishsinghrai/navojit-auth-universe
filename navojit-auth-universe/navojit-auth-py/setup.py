from setuptools import setup, find_packages

setup(
    name="navojit-auth-py",
    version="4.0.0", # Version Bump to 3.0
    packages=find_packages(),
    install_requires=["PyJWT>=2.8.0"],
    author="Kashish Singh",
    description="Universal Global Auth Engine for Navojit Ecosystem",
    long_description="High-performance, cross-language authentication engine.",
    classifiers=[
        "Programming Language :: Python :: 3",
        "License :: OSI Approved :: MIT License",
    ],
)