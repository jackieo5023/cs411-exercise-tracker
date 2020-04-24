"""empty message

Revision ID: e40d49e982da
Revises: 66f05a66792b
Create Date: 2020-04-09 23:07:15.995187

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import mysql

# revision identifiers, used by Alembic.
revision = 'e40d49e982da'
down_revision = '66f05a66792b'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.alter_column('CompletedWorkout', 'workoutId',
               existing_type=mysql.INTEGER(display_width=11),
               type_=sa.String(length=255),
               existing_nullable=False)
    op.alter_column('people', 'lastName',
               existing_type=mysql.VARCHAR(length=225),
               type_=sa.String(length=255),
               existing_nullable=False)
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.alter_column('people', 'lastName',
               existing_type=sa.String(length=255),
               type_=mysql.VARCHAR(length=225),
               existing_nullable=False)
    op.alter_column('CompletedWorkout', 'workoutId',
               existing_type=sa.String(length=255),
               type_=mysql.INTEGER(display_width=11),
               existing_nullable=False)
    # ### end Alembic commands ###