from sqlalchemy import Column, ForeignKey, Integer, String
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship

Base = declarative_base()


class Parent(Base):
    __tablename__ = "parent_o2o"
    id = Column(Integer, primary_key=True, comment="test-test-test")
    name = Column(String, default="ok", unique=True)
    children = relationship("Child", back_populates="parent")


class Child(Base):
    __tablename__ = "child_o2o"
    id = Column(Integer, primary_key=True, comment="child_pk_test")
    parent_id = Column(
        Integer,
        ForeignKey("parent_o2o.id"),
        info=({"description": "child_parent_id_test"}),
    )
    parent = relationship("Parent", back_populates="children")
